const { RESTDataSource } = require('apollo-datasource-rest');

class BoredAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.boredapi.com/api/';
  }

  async getEventByParams({ type, participants, price }) {
    const res = await this.get('activity', { type: type, participants: participants, price: price });
    return this.eventReducer(res);
  }

  // leaving this inside the class to make the class easier to test
  eventReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
    };
  }

}

module.exports = BoredAPI;
