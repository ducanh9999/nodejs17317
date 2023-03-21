import express from "express";

const router = express.Router()

const data = [
    { id: 1, name: "Chuột", price: 100 },
    { id: 2, name: "Bàn phím", price: 200 },
    { id: 3, name: "Màn hình", price: 500 },
]

// Miiddleware
router.use((req, res, next) => {
    console.log(req.url);
    next()
})

router.get('/products', (req, res) => {
    try {
        res.send(data)
        res.end()
    } catch (error) {
        res.status(500).send({
            message: "Lỗi server"
        })
        res.end()
    }
})

// Get product by ID
router.get('/products/:id', (req, res) => {
    try {
        const id = req.params.id
        const product = data.find((item) => item.id == id)
        if (product) {
            res.send(product)
        } else {
            res.status(400).send({
                message: "San pham khong ton tai!"
            })
        }
    } catch(error) {
        res.status(500).send({
            message: "Lỗi server"
        })
        res.end()
    }
})

// Created
router.post('/products', (req, res) => {
    // console.log(req, "create product");
    const newData = req.body
    data.push(newData)
    res.send({
        message: "Thêm mới thành công"
    })
})

// Updated
router.put('/products/:id', (req, res) => {
    const id = req.params.id
    const updateData = req.body
    const productIndex = data.findIndex(item => item.id == id)
    if (productIndex >= 0) {
        data[productIndex] = { ...data[productIndex], ...updateData }
        console.log(updateData);
        res.send(data[productIndex])
        res.end()
    } else {
        res.status(400).send("Sản phẩm không tồn tại!")
    }
})

// Delete
router.delete("/products/:id", (req, res) => {
    try {
        const id = req.params.id
        const productIndex = data.findIndex(item => item.id == id)
        if (productIndex >= 0) {
            data.splice(productIndex, 1)
            res.json(data)
            res.end()
        } else {
            res.status(400).send("Sản phẩm không tồn tại!")
        }
    } catch(error) {
        res.status(500).send({
            message: "Lỗi server"
        })
        res.end()
    }

})

export default router