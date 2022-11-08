import * as React from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import List from "./components/List";
import SupabaseClient from "./lib/supabase";

export default function App() {
  const supabaseClient = new SupabaseClient();
  const inputElement = React.useRef(null);
  const [listItems, setListItems] = React.useState([]);

  const getAllTodos = async () => {
    let data = await supabaseClient.getItems();

    setListItems(data);
  };

  // 항목 추가
  const addItem = async (inputText) => {
    await supabaseClient.addItem(inputText);

    // 등록 후에 값을 비워주고 focus 시킨다.
    inputElement.current.value = "";
    inputElement.current.focus();

    getAllTodos();
  };

  // 초기 진입시에 기존 할일 목록 전체를 불러와 state에 저장한다
  React.useEffect(() => {
    getAllTodos();
  }, []);

  const handleItemChecked = async (e, id) => {
    e.stopPropagation();

    // 완료 체크 박스 상태를 토글한 값으로 업데이트 API 호출 후 다시 불러온다
    const item = listItems.filter((item) => item.id == id);
    if (item.length > 0) {
      const { isCompleted } = item[0];

      const newItem = {
        isCompleted: !isCompleted,
      };

      await supabaseClient.updateItemById(id, newItem);

      getAllTodos();
    }
  };

  const handleDeleteClicked = async (e, id) => {
    e.stopPropagation();

    if (confirm("정말 삭제하시겠습니까?")) {
      await supabaseClient.deleteItemById(id);

      getAllTodos();
    }
  };

  const handleAddClicked = async (e) => {
    // 생성 API 요청 후 항목들을 다시 불러온다.
    const inputText = inputElement.current.value;

    addItem(inputText);
  };

  const handleKeyPressed = async (e) => {
    // 엔터키 입력시에 등록 처리를 한다.
    if (e.key == "Enter") {
      const inputText = e.target.value;

      addItem(inputText);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SUPATODO
        </Typography>

        <List
          items={listItems}
          onCheckHandler={handleItemChecked}
          onDeleteHandler={handleDeleteClicked}
        />

        <TextField
          id="outlined-basic"
          size="small"
          label="To do"
          inputRef={inputElement}
          onKeyPress={handleKeyPressed}
          variant="outlined"
          sx={{ margin: 2 }}
        />

        <Button variant="contained" onClick={handleAddClicked} sx={{ my: 2 }}>
          추가
        </Button>
      </Box>
    </Container>
  );
}
