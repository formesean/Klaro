export default function Page({ params }) {
  return (
    <div>
      <h1>Parcel Details</h1>
      {params.id}
    </div>
  );
}
