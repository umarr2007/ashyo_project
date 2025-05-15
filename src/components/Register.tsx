import { useState, FormEvent } from "react";
import axios from "axios";
import { RegisterProps } from "../types/register.types";

const Register = ({ onClose, onSwitchToLogin }: RegisterProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        "https://api.ashyo.fullstackdev.uz/auth/register",
        { name, email, password }
      );
      if (response.data) {
        setMessage("Muvaffaqiyatli ro'yxatdan o'tdingiz");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setMessage("Xatolik yuz berdi. Qaytadan urinib ko'ring");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] p-12 relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 text-3xl"
        >
          ✕
        </button>
        <div className="flex mb-10 mt-2 gap-3 w-full justify-center">
          <button
            className="flex-1 py-4 rounded-[6px] text-xl font-semibold bg-white text-gray-900 shadow-none focus:outline-none"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
          <button
            className="flex-1 py-4 rounded-[6px] text-xl font-semibold bg-gray-100 text-gray-900 shadow-none focus:outline-none"
            style={{ background: "#f3f4f6" }}
          >
            Register
          </button>
        </div>
        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl text-center text-base w-full max-w-[518px]">
            {message}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6 w-full"
        >
          <input
            type="text"
            placeholder="Enter your name"
            className="rounded-[6px] w-[518px] h-[48px] bg-[#ebeff3] text-[16px] placeholder:text-[16px] border-none px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ boxShadow: "none" }}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-[6px] w-[518px] h-[48px] bg-[#ebeff3] text-[16px] placeholder:text-[16px] border-none px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ boxShadow: "none" }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="rounded-[6px] w-[518px] h-[48px] bg-[#ebeff3] text-[16px] placeholder:text-[16px] border-none px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ boxShadow: "none" }}
          />
          <button
            type="submit"
            className="rounded-[6px] px-[20px] py-[10px] w-[160px] h-[48px] bg-[#134e9b] font-medium text-[16px] text-white mt-4 hover:bg-[#1756b0] transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
