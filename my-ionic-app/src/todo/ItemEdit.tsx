import React, { useContext, useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import { RouteComponentProps } from 'react-router';
import { ItemProps } from './ItemProps';

const log = getLogger('ItemEdit');

interface ItemEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const ItemEdit: React.FC<ItemEditProps> = ({ history, match }) => {
  const { items, saving, savingError, saveItem } = useContext(ItemContext);

  // 1. State hooks for all recipe entity properties
  const [name, setName] = useState('');
  const [bakingTimeMinutes, setBakingTimeMinutes] = useState<number>(30);
  const [lastPreparedDate, setLastPreparedDate] = useState<string>(
      new Date().toISOString().split('T')[0]
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [ingredients, setIngredients] = useState<string>('');

  const [item, setItem] = useState<ItemProps>();

  // 2. Load existing item data when editing
  useEffect(() => {
    log('useEffect');
    const routeId = match.params.id || '';
    const foundItem = items?.find(it => it._id === routeId);
    setItem(foundItem);
    if (foundItem) {
      setName(foundItem.name || '');
      setBakingTimeMinutes(foundItem.bakingTimeMinutes ?? 30);
      setLastPreparedDate(foundItem.lastPreparedDate || new Date().toISOString().split('T')[0]);
      setIsSuccess(foundItem.isSuccess ?? true);
      setIngredients(foundItem.ingredients || '');
    }
  }, [match.params.id, items]);

  // 3. Save the recipe with all updated properties
  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a recipe name');
      return;
    }
    const editedItem: ItemProps = item
        ? { ...item, name, bakingTimeMinutes, lastPreparedDate, isSuccess, ingredients }
        : { name, bakingTimeMinutes, lastPreparedDate, isSuccess, ingredients };

    saveItem && saveItem(editedItem).then(() => history.goBack());
  };

  log('render');
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {/* Back button to return to the recipe list without saving */}
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{item ? 'Edit Recipe' : 'New Recipe'}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleSave}>
                Save
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* String property: Recipe name */}
          <IonItem>
            <IonLabel position="stacked">Recipe Name</IonLabel>
            <IonInput
                value={name}
                placeholder="e.g. Chocolate Chip Cookies"
                onIonChange={e => setName(e.detail.value || '')}
            />
          </IonItem>

          {/* Numeric property: Baking time in minutes */}
          <IonItem>
            <IonLabel position="stacked">Baking Time (minutes)</IonLabel>
            <IonInput
                type="number"
                value={bakingTimeMinutes}
                placeholder="e.g. 45"
                onIonChange={e => setBakingTimeMinutes(Number(e.detail.value) || 0)}
            />
          </IonItem>

          {/* Date property: Last prepared date */}
          <IonItem>
            <IonLabel position="stacked">Last Prepared Date</IonLabel>
            <IonInput
                type="date"
                value={lastPreparedDate}
                onIonChange={e => setLastPreparedDate(e.detail.value || '')}
            />
          </IonItem>

          {/* Boolean property: Whether the recipe was a success */}
          <IonItem>
            <IonLabel>Recipe was a success</IonLabel>
            <IonToggle
                checked={isSuccess}
                onIonChange={e => setIsSuccess(e.detail.checked)}
                slot="end"
            />
          </IonItem>

          {/* Supplementary string property: Ingredients list */}
          <IonItem>
            <IonLabel position="stacked">Ingredients</IonLabel>
            <IonTextarea
                value={ingredients}
                placeholder="e.g. 200g flour, 2 eggs, 100g butter..."
                rows={4}
                onIonChange={e => setIngredients(e.detail.value || '')}
            />
          </IonItem>

          <IonLoading isOpen={saving} message="Saving recipe..." />
          {savingError && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {savingError.message || 'Failed to save recipe'}
              </div>
          )}
        </IonContent>
      </IonPage>
  );
};

export default ItemEdit;