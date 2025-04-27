"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const PostCard: React.FC<{ post: Post; onClick: (id: number) => void }> = ({
  post,
  onClick,
}) => (
  <div
    className="border p-4 rounded shadow hover:bg-blue-50 cursor-pointer"
    onClick={() => onClick(post.id)}
  >
    <h2 className="text-xl font-bold">{post.title}</h2>
    <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
  </div>
);

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => (
  <div className="p-3 border rounded mb-2 bg-gray-50">
    <p className="font-bold">{comment.name}</p>
    <p className="text-sm text-gray-600">{comment.email}</p>
    <p className="mt-1">{comment.body}</p>
  </div>
);

const UserCard: React.FC<{ user: User; onSelect: (user: User) => void }> = ({
  user,
  onSelect,
}) => (
  <div
    className="p-4 bg-white rounded shadow cursor-pointer hover:bg-green-50"
    onClick={() => onSelect(user)}
  >
    <h3 className="font-bold">{user.name}</h3>
    <p>{user.email}</p>
    <p className="text-sm text-gray-500">{user.phone}</p>
  </div>
);

const TodoCard: React.FC<{ todo: Todo; toggleTodo: (id: number) => void }> = ({
  todo,
  toggleTodo,
}) => (
  <div
    onClick={() => toggleTodo(todo.id)}
    className={`p-3 border rounded mb-2 cursor-pointer ${
      todo.completed ? "bg-green-100" : "bg-white"
    }`}
  >
    <p className={`${todo.completed ? "line-through text-gray-400" : ""}`}>
      {todo.title}
    </p>
  </div>
);

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostBody, setNewPostBody] = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");

  const [showAddPost, setShowAddPost] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchTodos();
  }, []);

  useEffect(() => {
    if (selectedPostId) fetchComments(selectedPostId);
  }, [selectedPostId]);

  const fetchPosts = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    const data = await res.json();
    setPosts(data);
  };

  const fetchComments = async (postId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const data = await res.json();
    setComments(data);
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchTodos = async () => {
    setLoadingTodos(true);
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoadingTodos(false);
    }
  };

  const handleAddPost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      title: newPostTitle,
      body: newPostBody,
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostBody("");
    setShowAddPost(false);
  };

  const handleDeletePost = (id: number) => {
    const updated = posts.filter((post) => post.id !== id);
    setPosts(updated);
    if (selectedPostId === id) setSelectedPostId(null);
  };

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const newTodoItem: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Next.js + React + TypeScript Combined App
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Practice project — Posts, Comments, Users, Todos!
        </p>
      </header>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Posts</h2>
          <button
            onClick={() => setShowAddPost(!showAddPost)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showAddPost ? "Cancel" : "Add Post"}
          </button>
        </div>

        {showAddPost && (
          <div className="bg-white p-4 mb-6 rounded shadow">
            <input
              type="text"
              placeholder="Post title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full p-2 border mb-4 rounded"
            />
            <textarea
              placeholder="Post body"
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              className="w-full p-2 border mb-4 rounded"
              rows={5}
            />
            <button
              onClick={handleAddPost}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Post
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} onClick={setSelectedPostId} />
              <div className="text-right mt-2">
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedPostId && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Comments for Post #{selectedPostId}
          </h2>
          <div className="bg-white p-4 rounded shadow">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onSelect={openUserModal} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Todos</h2>
        <div className="bg-white p-4 mb-6 rounded shadow">
          <input
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <button
            onClick={handleAddTodo}
            className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add Todo
          </button>
        </div>

        {loadingTodos ? (
          <p>Loading todos...</p>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
          </div>
        )}
      </section>

      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-12">
        Made with ❤️ by Malahima for practice.
      </footer>
    </div>
  );
};

export default Home;
