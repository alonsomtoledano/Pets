import { ObjectID } from "mongodb";
import * as uuid from "uuid";

const Mutation = {
    addUser: async (parent, args, ctx, info) => {
        const { name, surname, email, password, bankAccount } = args;
        const { client } = ctx;

        const db = client.db("pets");
        const collection = db.collection("Users");

        const result = await collection.findOne({ email });

        if (!result) {
            const object = await collection.insertOne({ name, surname, email, password, bankAccount });
            return object.ops[0];
        }
    },
    login: async (parent, args, ctx, info) => {
        const { email, password } = args;
        const { client } = ctx;

        const db = client.db("pets");
        const collection = db.collection("Users");

        const result = await collection.findOne({ email, password });

        if (result) {
            const token = uuid.v4();
            await collection.updateOne({ email: email }, { $set: { token: token } });
            return token;
        }
    },
    logout: async (parent, args, ctx, info) => {
        const { token } = args;
        const { client } = ctx;

        const db = client.db("pets");
        const collection = db.collection("Users");

        const result = await collection.findOne({ token: token });
        if (result) {
            const token = null;
            const object = await collection.findOne({ _id: ObjectID(result._id) }, { token: token });
            await collection.updateOne({ _id: ObjectID(result._id) }, { $set: { token: token } }, { returnOriginal: false });
            return object;
        }
    },
    updateUser: async (parent, args, ctx, info) => {
        const { token, name, surname, password, bankAccount } = args;
        const { client } = ctx;

        const db = client.db("pets");
        const collection = db.collection("Users");

        const result = await collection.findOne({ token: token });

        if (result) {
            let jsonUpdate;


            if (args.name) {
                const updtateName = await collection.findOne({ name });
                if (!updtateName) {
                    jsonUpdate = {
                        name: args.name,
                        ...jsonUpdate
                    }
                } else {
                    jsonUpdate = {
                        name: args.name
                    }
                }
            }
            if (args.surname) {
                const updateSurname = await collection.findOne({ surname });
                if (!updateSurname) {
                    jsonUpdate = {
                        surname: args.surname,
                        ...jsonUpdate
                    }
                }
            }
            if (args.password) {
                const updatePassword = await collection.findOne({ password });
                if (!updatePassword) {
                    jsonUpdate = {
                        password: args.password,
                        ...jsonUpdate
                    }
                }
            }
            if (args.bankAccount) {
                const updateBankAccount = await collection.findOne({ bankAccount });
                if (!updateBankAccount) {
                    jsonUpdate = {
                        bankAccount: args.bankAccount,
                        ...jsonUpdate
                    }
                }
            }
            const object = await collection.findOneAndUpdate({ _id: ObjectID(result._id) }, { $set: jsonUpdate }, { returnOriginal: false });
            return object.value;
        }
    },
}
export { Mutation as default };