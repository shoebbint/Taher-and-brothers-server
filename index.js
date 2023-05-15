const express = require('express');
const cors =require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port=process.env.PORT||5000;
//middleware
app.use(cors());
app.use(express.json())


//Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taherandbrothers.tmbhthd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
    const categoriesCollection = client.db("TaherAndBrothers").collection("categories");
    const subcategoriesCollection = client.db("TaherAndBrothers").collection("sub_categories");
    const productsCollection = client.db("TaherAndBrothers").collection("products");
//Add category
        app.post("/addCategory",async(req,res)=>{
          const newCategory=req.body;
          const result = await categoriesCollection.insertOne(newCategory);
          res.send(result)
        })
//Add subcategory
        app.post("/addsubcategory",async(req,res)=>{
          const newSubCategory=req.body;
          const result = await subcategoriesCollection.insertOne(newSubCategory);
          res.send(result)
        })
//Add product
        app.post("/addproduct",async(req,res)=>{
          const newProduct=req.body;
          const result = await productsCollection.insertOne(newProduct);
          res.send(result)
        })
//get all categories
app.get("/categories",async(req,res)=>{
  const query = {};
  const cursor = categoriesCollection.find(query);
  // iterate code goes here
const result= await cursor.toArray();;
  res.send(result)
})
//get all subcategories
app.get("/subcategories",async(req,res)=>{
  const query = {};
  const cursor = subcategoriesCollection.find(query);
  // iterate code goes here
const result= await cursor.toArray();;
  res.send(result)
})
//get all products
app.get("/products",async(req,res)=>{
  const query = {};
  const cursor = productsCollection.find(query);
  // iterate code goes here
const result= await cursor.toArray();;
  res.send(result)
})
//product by keys
app.post("/productByKeys", async(req, res) => {
  const keys = req.body;
  const ids=keys.map(id=>new ObjectId(id));
  const query={_id:{$in:ids}}
  const cursor=productCollection.find(query);
  const products=await cursor.toArray();
  console.log(keys)
  res.send(products);
})

  } 
  finally {
  // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port, ${port}`)
  })