import React from 'react';
import { IonItem, IonLabel, IonBadge } from '@ionic/react';
import { ItemProps } from './ItemProps';

interface ItemPropsExt extends ItemProps {
    onEdit: (id?: string) => void;
}

const Item: React.FC<ItemPropsExt> = ({
                                          _id,
                                          name,
                                          bakingTimeMinutes,
                                          lastPreparedDate,
                                          isSuccess,
                                          ingredients,
                                          onEdit,
                                      }) => {
    return (
        <IonItem button onClick={() => onEdit(_id)}>
            <IonLabel>
                {/* Dessert title */}
                <h2>{name}</h2>
                {/* Baking time and preparation date */}
                <p>Baking time: {bakingTimeMinutes} min &bull; Last prepared: {lastPreparedDate}</p>
                {/* Ingredients preview */}
                {ingredients && (
                    <p style={{ fontStyle: 'italic', fontSize: '0.85em', color: '#666' }}>
                        Ingredients: {ingredients}
                    </p>
                )}
            </IonLabel>
            {/* Visual badge for recipe outcome */}
            <IonBadge slot="end" color={isSuccess ? 'success' : 'danger'}>
                {isSuccess ? 'Success' : 'Failed'}
            </IonBadge>
        </IonItem>
    );
};

export default Item;