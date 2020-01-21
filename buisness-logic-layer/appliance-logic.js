const fs = require("fs");
const fileName = "./data-access-layer/aplliances.json";

function getAllAppsAsync() {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, apps) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(apps));
        });
    });
}

function saveAllAppsAsync(apps) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(apps, null, 4), err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

async function getOneAppAsync(id) {
    const apps = await getAllAppsAsync();
    const oneApp = apps.find(a => a.id === id);
    return oneApp;
}



async function addAppAsync(app) {
    const allApps = await getAllAppsAsync();
    app.id = allApps.length + 1;
    allApps.push(app);
    await saveAllAppsAsync(allApps);
    return app;
}



async function updateAppAsync(app) {
    const allApps = await getAllAppsAsync();
    const appToUpdate = allApps.find(a => a.id === app.id);

    if (!appToUpdate) { // אם הספר לא קיים
        return null;
    }
   // ריצה על האוביקט שהתקבל וכל מאפיין שבו אנו מעדכנים את האובייקט מהאוסף
   for (const prop in app) {
    if (prop in appToUpdate) {
        appToUpdate[prop] = app[prop];
    }
}
await saveAllAppsAsync(allApps);

return appToUpdate;
}

async function deleteAppAsync(id) {
    const allApps = await getAllAppsAsync();
    const index = allApps.findIndex(a => a.id === id);
    if (index >= 0) {
        allApps.splice(index, 1); // Delete one item in that index
        await saveAllAppsAsync(allApps);
    }
}


module.exports = {
    getAllAppsAsync,
    saveAllAppsAsync,
    getOneAppAsync,
    addAppAsync,
    updateAppAsync,
    deleteAppAsync
}