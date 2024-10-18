
import InputForm from "./components/InputBox";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
    <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
      Easily shorten your long URLs for sharing. Just enter your long URL
      below, and we’ll create a short, manageable link for you. Perfect for
      social media, emails, and more!
    </p>
    <InputForm />
  </div>
  );
}
