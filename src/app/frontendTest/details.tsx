

export default function Details() {
  const client = {
    name: "John Doe",
    phone: "123-456-7890",
    email: "johndoe@example.com",
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Client Details</h1>
      <div className="bg-red-700 p-8 rounded-lg shadow-lg text-center">
        <p className="text-lg mb-4">
          <strong>Name:</strong> {client.name}
        </p>
        <p className="text-lg mb-4">
          <strong>Phone:</strong> {client.phone}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {client.email}
        </p>
      </div>
    </div>
  );
}
