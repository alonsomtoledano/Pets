import { ObjectID } from "mongodb";
const Query = {
  getAnimals: async (parent, args, ctx, info) => {
    const { client } = ctx;
    const { shelter } = args;
    let table = null;

    if (shelter === 1) {
      table = "AnimalShelter1";
    } else if (shelter === 2) {
      table = "AnimalShelter2";
    } else if (shelter === 3) {
      table = "AnimalShelter3";
    }

    const db = client.db("pets");
    const collection = db.collection(table);

    const result = await collection.find({}).toArray();
    return result;
  },
  getAnimal: async (parent, args, ctx, info) => {
    const { animalID } = args;
    const { shelter } = args;
    const { client } = ctx;
    let table = null;

    if (shelter === 1) {
      table = "AnimalShelter1";
    } else if (shelter === 2) {
      table = "AnimalShelter2";
    } else if (shelter === 3) {
      table = "AnimalShelter3";
    }

    const db = client.db("pets");
    const collection = db.collection(table);

    const result = await collection.findOne({ _id: ObjectID(animalID) });
    return result;
  },

  getSpecies: async (parent, args, ctx, info) => {
    const { species } = args;
    const { shelter } = args;
    const { client } = ctx;
    let table = null;

    if (shelter === 1) {
      table = "AnimalShelter1";
    } else if (shelter === 2) {
      table = "AnimalShelter2";
    } else if (shelter === 3) {
      table = "AnimalShelter3";
    }

    const db = client.db("pets");
    const collection = db.collection(table);

    const result = await collection.find({ species: species }).toArray();
    return result;
  },

  getShelterData: async (parent, args, ctx, info) => {
    const { shelter } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("AnimalShelters");

    const result = await collection.findOne({ number: shelter });
    return result;
  },
  getUsersName: async (parent, args, ctx, info) => {
    const { name } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("Users");

    const result = await collection.findOne({ name: name });

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getUsers: async (parent, args, ctx, info) => {
    const { name } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("Users");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getUserToken: async (parent, args, ctx, info) => {
    const { token } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("Users");

    const result = await collection.findOne({ token: token });

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getUsersName: async (parent, args, ctx, info) => {
    const { name } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("Users");

    const result = await collection.findOne({ name: name });

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getUsers: async (parent, args, ctx, info) => {
    const { name } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("Users");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getUserToken: async (parent, args, ctx, info) => {
    const { token } = args;
    const { client } = ctx;

    const db = client.db("pets");
    const collection = db.collection("Users");

    const result = await collection.findOne({ token: token });

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
};
export { Query as default };
