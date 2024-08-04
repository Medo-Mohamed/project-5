const mongodb = require("mongodb");
const { MongoClient } = mongodb;
const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "testDataBase";

MongoClient.connect(connectionURL, async (error, respo) => {
    if (error) {
        return console.log("ERROR HAS OCUURED");
    }
    const db = respo.db(dbName);

    await db.collection("Users").insertOne({
        name: "mohamed",
        age: 24
    })

    await db.collection("Users").insertOne({
        name: "ahmed",
        age: 24
    })

    console.log("================ after add 2 users =================");
    ////////////////////////////////////////////////////////////////////////
    await db.collection("Users").insertMany([
        {
            name: "shehate",
            age: 27
        },
        {
            name: "ali",
            age: 10
        },
        {
            name: "abd-allah",
            age: 27
        },
        {
            name: "zein",
            age: 20
        },
        {
            name: "medo",
            age: 27
        },
        {
            name: "khald",
            age: 30
        },
        {
            name: "yaser",
            age: 27
        },
        {
            name: "adel",
            age: 40
        },
        {
            name: "mahmoud",
            age: 27
        },
        {
            name: "mmdoh",
            age: 50
        }
    ]);
    console.log("================ after add 10 users =================");
    ////////////////////////////////////////////////////////////////////////

    const users27 = await db.collection("Users").find({ age: 27 }).toArray();
    console.log(users27)
    console.log("========== after find all users have 27y =============");

    ////////////////////////////////////////////////////////////////////////

    const first3Users27 = await db.collection("Users").find({ age: 27 }).limit(3).toArray();
    console.log(first3Users27)
    console.log("======== after find first 3 users have 27y ===========");

    ////////////////////////////////////////////////////////////////////////


    let dataForNameUpdata = await db.collection("Users").find({}).limit(4).toArray();
    for (const element of dataForNameUpdata) {
        await db.collection("Users").updateOne({ _id: element._id }, { $set: { name: "Osama" } });
    }
    console.log("====== after updata name for first 4 users  ========");

    ////////////////////////////////////////////////////////////////////////

    let dataForAgeUpdata = await db.collection("Users").find({ age: 27 }).limit(4).toArray();

    for (const element of dataForAgeUpdata) {
        await db.collection("Users").updateOne({ _id: element._id },
            {
                $inc: { age: 4 }
            });
    }

    console.log("====== after icrement age for first 4 users  ========");
    ////////////////////////////////////////////////////////////////////////

    await db.collection("Users").updateMany({}, {
        $inc: { age: 10 }
    }).then(r => console.log("======== after icrement age for all users  =========="))
        .catch(e => console.log(e))


    ////////////////////////////////////////////////////////////////////////

    await db.collection("Users").deleteMany({ age: 41 })
        .then(r => {
            console.log(r.deletedCount)
            console.log("======== after delete all users have 41y ===========");
        })
        .catch(e => console.log(e))

    ////////////////////////////////////////////////////////////////////////

})