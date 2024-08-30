"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostForm = async (title: string, email: string) => {
  const res = await fetch(`http://localhost:3000/api/user`, {
    method: "POST",
    body: JSON.stringify({ title, email }),
    headers: {
      "Content-type": "application/josn",
    },
  });
  const data = await res.json();
};

export default function Home() {
  const router = useRouter();

  interface ChangeState {
    title: string;
    email: string;
  }
  const [Change, setChange] = useState<ChangeState>({
    title: "",
    email: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChange(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Change.title !== "" && Change.email !== "") {
      PostForm(Change.title, Change.email);
      router.push("/thanks");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            className="border"
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            className="border"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <button className="p-2 bg-gray-600">Submit</button>
      </form>
    </div>
  );
}
