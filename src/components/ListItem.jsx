import * as React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item ({item, onCheckHandler, onDeleteHandler}) {
  const { id, title, isCompleted } = item;
  const labelId = `checkbox-list-label-${id}`;

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={(e) => onDeleteHandler(e, id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={(e) => onCheckHandler(e, id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isCompleted}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`${title}`} />
      </ListItemButton>
    </ListItem>
  )
}