const { where } = require("sequelize");
const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Restaurant", async () => {
    await Restaurant.create(seedRestaurant[0]);
    let response = await Restaurant.findByPk(1);
    expect(response.name).toEqual(seedRestaurant[0].name);
  });

  test("can create a Menu", async () => {
    await Menu.create(seedMenu[0]);
    let response = await Menu.findByPk(1);
    expect(response.title).toEqual(seedMenu[0].title);
  });

  test("can update a Restaurant instance", async () => {
    const restaurantToUpdate = await Restaurant.findOne({
      where: { name: seedRestaurant[0].name },
    });

    if (restaurantToUpdate) {
      const updatedRestaurant = await restaurantToUpdate.update({
        location: "New Location",
      });
      expect(updatedRestaurant.location).toBe("New Location");
    } else {
      expect(true).toBe(false);
    }
  });

  test("can update a Menu instance", async () => {
    const menuToUpdate = await Menu.findOne({
      where: { title: seedMenu[0].title },
    });

    if (menuToUpdate) {
      const updatedMenu = await menuToUpdate.update({ title: "New Title" });
      expect(updatedMenu.title).toBe("New Title");
    } else {
      expect(true).toBe(false);
    }
  });

  test("can delete a Restaurant instance", async () => {
    const restaurant = await Restaurant.create(seedRestaurant[2]);
    await restaurant.destroy({ force: true });
    const count = await Restaurant.count();
    expect(count).toBe(1);
  });
});
