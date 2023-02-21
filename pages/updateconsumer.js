import { ddbDocClient } from "../config/ddbDocClient";
import { useRouter } from "next/router";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const styles = {
    inputField: "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
}


const UpdateData = () => {
  const router = useRouter();
  const data = router.query;
  
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // setting up the parameters for UpdateCommand
    const params = {
      TableName: "Consumers",
      Key: {
        id: Number(data.id), //primaryKey
        dateAdded: data.dateAdded, //sortKey
      },
      UpdateExpression:
        "set consumerName = :a, consumerDetails = :b, city = :c, productName =:d, productPrice =:e, productCategory = :f, phoneNumber = :z, dateModified = :k",
      ExpressionAttributeValues: {
        ":a": event.target.consumerName.value,
        ":b": event.target.consumerDetails.value,
        ":c": event.target.city.value,
        ":d": event.target.productName.value,
        ":e": event.target.productPrice.value,
        ":f": event.target.productCategory.value,
        ":z": event.target.phoneNumber.value,
        ":k": new Date().toLocaleString(),
      },
    };

    // updating the db
    try {
      const data = await ddbDocClient.send(new UpdateCommand(params));
      console.log("Success - updated", data);
      alert('Data Updated Successfully')
      router.push('/viewconsumer')
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-3xl mb-10">Add Data</p>
        <h1 className="text-4xl mb-2 mt-5 bold">
              Update Consumer Details
            </h1>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-1/3 justify-self-center">
          <form onSubmit={handleSubmit} id="addData-form">
            <div className="form-group mb-6">
              <label
                htmlFor="consumerName"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Consumer Name
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="consumerName"
                name="consumerName"
                defaultValue={data.consumerName}
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="consumerDetails"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Consumer Details
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="consumerDetails"
                name="consumerDetails"
                defaultValue={data.consumerDetails}
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="city"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="city"
                name="city"
                defaultValue={data.city}
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="productName"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="productName"
                name="productName"
                defaultValue={data.productName}
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="productPrice"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Product Price
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="productPrice"
                name="productPrice"
                defaultValue={data.productPrice}
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="productCategory"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Product Category
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="productCategory"
                name="productCategory"
                defaultValue={data.productCategory}
              />
            </div> 
            <div className="form-group mb-6">
              <label
                htmlFor="phoneNumber"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="number"
                className={styles.inputField}
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={data.phoneNumber}
              />
            </div>

            <button
              type="submit"
              className="
    px-6
    py-2.5
    bg-blue-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition
    duration-150
    ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;
