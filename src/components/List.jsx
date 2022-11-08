import * as React from 'react';
import List from '@mui/material/List';
import ListItem from './ListItem'

export default function CheckboxList({items, onCheckHandler, onDeleteHandler}) {
  return (
    <List>
      {
        items.map((item) => 
          <ListItem key={item.id} item={item} onCheckHandler={onCheckHandler} onDeleteHandler={onDeleteHandler} />
        )
      }
    </List>
  );
}