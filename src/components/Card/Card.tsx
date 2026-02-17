import React from 'react';
import Text from '../Text'
import './Card.css'

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot
}) => {
    return(
        <div className={`card ${className}`} onClick={onClick}>
            <img className='card_image' src={image} alt="image" />
            <ul className='card_content'>
                <li className='card_texts'>
                    {captionSlot && <Text view='p-14' tag='p' color='secondary' weight='medium'>{captionSlot}</Text>}
                    <Text view='p-20' tag='p' color='primary' weight='medium' maxLines={2}>{title}</Text>
                    <Text view='p-16' tag='p' color='secondary' weight='medium' maxLines={3}>{subtitle}</Text>
                </li>
                <li className='card_footer'>
                    {contentSlot && <Text view='p-18' tag='p' color='primary' weight='bold' >{contentSlot}</Text>}
                    {actionSlot}
                </li>
            </ul>
            

        </div>
    )
};

export default Card;
