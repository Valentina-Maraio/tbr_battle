import HomePage from "../homepage/page";

export default function SharedPage() {
  return (
    <HomePage>
      <div>
        <h1 className="text-2xl font-bold">Shared books</h1>
        <p>This is the list fo books you shared with your friends</p>
      </div>
    </HomePage>
  );
}
