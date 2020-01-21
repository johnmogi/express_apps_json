const express = require("express");
const appsLogic = require("../buisness-logic-layer/appliance-logic");
 const AppModel = require("../models/appliance-model");

const router = express.Router();

// GET http://localhost:3000/api/apps
router.get("/", async (request, response) => {
    try {
        const apps = await appsLogic.getAllAppsAsync();
        response.json(apps);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id
        // console.log(id)
        const app = await appsLogic.getOneAppAsync(id);
        response.json(app);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3000/api/books
router.post("/", async (request, response) => {
    try {
        const app = request.body;

        // Validation: 
        const errors = AppModel.validate(app);
        if (errors) {
            response.status(400).send(errors);
            return;
        }

        const addedApp = await appsLogic.addAppAsync(app);
        response.status(201).json(addedApp);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3000/api/books/3
router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const app = request.body;
        app.id = id;
        const updatedApp = await appsLogic.updateAppAsync(app);
        if (!updatedApp) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedApp);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// PATCH http://localhost:3000/api/books/3
router.patch("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const app = request.body;
        app.id = id;
        const updatedApp = await appsLogic.updateAppAsync(app);
        if (!updatedApp) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedApp);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// appssController

// DELETE http://localhost:3000/api/books/3
router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await appsLogic.deleteAppAsync(id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;