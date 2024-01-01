import { React } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { GoTrash } from 'react-icons/go';
import EditList from "../components/EditList"
import { useTranslation } from 'react-i18next';

export const ShopCatalog = (props) => {

  const { t } = useTranslation();

  const changeTodo = (e) => {
    const selectedId = e.currentTarget.dataset.id;
    props.onSelected(selectedId);
  };

  const checkActive = (i) => {
    return i === props.selectedID ? 'list-group-item active' : 'list-group-item';
  };

  const handleDelete = (index) => {
    props.onDeleteShop(index);
  };

  let selectedID = props.selectedID;
  let allItems = props.Todos;

  return (
    <Grid container spacing={2}>
      {allItems.map(function (item, i) {
        let _class = checkActive(i);

        return (
          <Grid item xs={12} sm={6} md={5} lg={3} key={i}>
              <Paper
                elevation={3}
                className={_class}
                style={{
                  padding: '15px',
                  cursor: 'pointer',
                  backgroundColor: i === selectedID ? '#5bc0de' : 'inherit',
                  color: i === selectedID ? '#fff' : 'inherit',
                }}
                onClick={changeTodo}
                data-id={i}
              >
                <Typography variant="h6">{item.name}</Typography>
    <Typography variant="body2">
                <span className="badge">{item.items.length}</span> {t('items')}
              </Typography>

                <EditList onUpdateListName={props.onUpdateListName} />

                <button className="btn btn-danger" onClick={() => handleDelete(i)}>
                  <GoTrash />
                </button>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ShopCatalog;
