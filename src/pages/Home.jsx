import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchTodos(user.uid); // Fetch todos if the user is authenticated
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch Todos for the logged-in user
  const fetchTodos = async (uid) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'todos'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to load todos.");
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (newTodo.trim() === '' || !user) return;
    try {
      const newTodoItem = {
        uid: user.uid,
        text: newTodo,
        createdAt: Date.now(),
      };
      await addDoc(collection(db, 'todos'), newTodoItem);
      setNewTodo('');
      fetchTodos(user.uid); // Refresh todos after adding
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo.");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {loading ? (
        <p>Loading todos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <header className="mb-5 mt-14">
            <h1 className="text-3xl font-bold text-primary">Your Todos</h1>
          </header>

          <div className="w-full max-w-md flex items-center mb-6">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="input input-bordered input-primary w-full mr-2"
            />
            <button
              onClick={isEditing ? updateTodo : addTodo}
              className="btn btn-primary"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>

          <div className="w-full max-w-md space-y-4">
            {todos.length === 0 ? (
              <p>No todos yet. Start adding some!</p>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between mb-4 p-3 bg-white rounded shadow border-l-4 border-primary"
                >
                  <span className="text-primary font-bold mr-3">{index + 1}.</span>
                  <span className="text-lg flex-1 ">{todo.text}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editTodo(todo)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
