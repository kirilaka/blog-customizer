import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { fontFamilyOptions, defaultArticleState, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType, ArticleStateType } from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  onChangeForm?: (option: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChangeForm }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [formState, setFormState] = useState(defaultArticleState)
	const sidebarRef = useRef<HTMLDivElement>(null)
	
	const handleAsideClick = () => {
		setIsOpen(prev => !prev)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if(
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])
	
	const handleChange = (key: string, value: OptionType) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
		console.log(value,)
	};
	
	const handleReset = () => {
		setFormState(defaultArticleState)
		onChangeForm?.(defaultArticleState);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onChangeForm?.(formState);
	}
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleAsideClick} />
			<aside ref={sidebarRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}  onSubmit={handleSubmit}>
					<h1 style={{fontFamily: defaultArticleState.fontFamilyOption.value, fontSize: 31, fontWeight: 800, textTransform: 'uppercase'}}>
						задайте параметры
					</h1>
					<Select 
						selected={formState.fontFamilyOption} 
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>
					<RadioGroup
						name = "fontSize"
						options = {fontSizeOptions}
						selected = {formState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						title = "размер шрифта"
						/>
					<Select
						selected={formState.fontColor} 
						options={fontColors}
						title='цвет шрифта'
						onChange={(value) => handleChange('fontColor', value)}
					/>
					<Separator/>
					<Select
						selected={formState.backgroundColor} 
						options={backgroundColors}
						title='цвет фона'
						onChange={(value) => handleChange('backgroundColor', value)}
					/>
					<Select
						selected={formState.contentWidth} 
						options={contentWidthArr}
						title='ширина контента'
						onChange={(value) => handleChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' 
						onClick={handleReset}/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
