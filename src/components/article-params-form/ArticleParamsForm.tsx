import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

type ParamStateFromProps = {
	setCurrentParamsState: (articleState: ArticleStateType) => void;
};

const defaultFontFamily = defaultArticleState.fontFamilyOption;
const defaultFontSize = defaultArticleState.fontSizeOption;
const defaultFontColor = defaultArticleState.fontColor;
const defaultBackgroundColor = defaultArticleState.backgroundColor;
const defaultcontentWidth = defaultArticleState.contentWidth;

export const ArticleParamsForm = ({
	setCurrentParamsState,
}: ParamStateFromProps) => {
	const setParamsToDefault = () => {
		setFontFamily(defaultFontFamily);
		setFontSize(defaultFontSize);
		setFontColor(defaultFontColor);
		setBackgroundColor(defaultBackgroundColor);
		setContentWidth(defaultcontentWidth);
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [fontFamily, setFontFamily] = useState(defaultFontFamily);
	const [fontSize, setFontSize] = useState(defaultFontSize);
	const [fontColor, setFontColor] = useState(defaultFontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultBackgroundColor
	);
	const [contentWidth, setContentWidth] = useState(defaultcontentWidth);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('change: submit form');
		const currentParamsData = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		setCurrentParamsState(currentParamsData);
	};

	const handleReset = () => {
		setCurrentParamsState(defaultArticleState);
		setParamsToDefault();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<aside className={clsx(styles.container, styles.container_open)}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text weight={800} size={31} uppercase={true}>
							Задайте параметры
						</Text>

						<Select
							title={'Шрифт'}
							selected={fontFamily}
							options={fontFamilyOptions}
							onChange={setFontFamily}></Select>

						<RadioGroup
							title='Размер шрифта'
							selected={fontSize}
							options={fontSizeOptions}
							onChange={setFontSize}
							name='fontSize'></RadioGroup>

						<Select
							title='Цвет шрифта'
							selected={fontColor}
							options={fontColors}
							onChange={setFontColor}></Select>

						<Separator></Separator>

						<Select
							title='Цвет фона'
							selected={backgroundColor}
							options={backgroundColors}
							onChange={setBackgroundColor}></Select>
						<Select
							title='Ширина контента'
							selected={contentWidth}
							options={contentWidthArr}
							onChange={setContentWidth}></Select>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
