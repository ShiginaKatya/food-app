import * as React from 'react';
import "./Text.css";

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
    className,
    view,
    tag: Tag = 'p',
    weight='normal',
    children,
    color='inherit',
    maxLines
}) =>{
    const fontWeights ={
        'normal': 400,
        'medium': 500,
        'bold': 700
    }
    const textStyle: React.CSSProperties = {
        fontWeight: fontWeights[weight] || 400,
        ...(maxLines && {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        WebkitLineClamp: maxLines,
        }),
    }
    return(
    <Tag className={`txt ${className}`} data-view={view} data-color={color} style={textStyle} >
        {children}
    </Tag>
    );
};

export default Text;
