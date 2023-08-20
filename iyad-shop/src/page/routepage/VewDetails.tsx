import { useLoaderData } from "react-router-dom";

const VewDetails = () => {
  const details = useLoaderData();
  // const { category, image, name, price, quantity } = details;
  console.log(details);
  return (
    <div>
      <h1>Veaw Product details</h1>
    </div>
  );
};

export default VewDetails;
