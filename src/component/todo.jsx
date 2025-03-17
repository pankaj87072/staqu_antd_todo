import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, removeTodo } from '../redux/todoSlice';
import { Input, Button, List, Typography, Space, Layout, Card } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import '../App.css'; // Import CSS for background image

const { Title } = Typography;
const { Content } = Layout;

const Todo = () => {
  const dispatch = useDispatch();
  const todoslist = useSelector(state => state.todos.list);
  const [task, setTask] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const AddTodo = () => {
      dispatch(addTodo(task));
      setTask('');
  };

  return (
    <Layout className="todo-background">
      <Content className="todo-container">
        <Card className="todo-card">
          <Title>Todo List</Title>

          <Space style={{ display: 'flex', marginBottom: 20, justifyContent:'center' }}>
            <Input
              placeholder="Enter Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={AddTodo}>
              Add
            </Button>
          </Space>
          <List
            bordered
            dataSource={todoslist}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(removeTodo(item.id))}
                  />,
                ]}
              >
                {item.todo}
              </List.Item>
            )}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Todo;
