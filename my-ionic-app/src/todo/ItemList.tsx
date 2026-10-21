import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Item from './Item';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';

const log = getLogger('ItemList');

const ItemList: React.FC<RouteComponentProps> = ({ history }) => {
  const { items, fetching, fetchingError } = useContext(ItemContext);
  log('render', fetching);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sweet Bake Book</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Loading spinner while fetching data from the server */}
        {/* Recipe list view */}
        {items && (
            <IonList>
              {items.map(item => (
                  <Item
                      key={item._id}
                      {...item}
                      onEdit={id => history.push(`/item/${id}`)}
                  />
              ))}
            </IonList>
        )}
        {/* Display fetching errors if any */}
        {fetchingError && (
            <div style={{ color: 'red', padding: '16px' }}>
              {fetchingError.message || 'Failed to fetch recipes'}
            </div>
        )}
        {/* Floating action button at the bottom-right to add a new recipe */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/item')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default ItemList;