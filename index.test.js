const request = require("supertest");
const index = require("./index");

describe("Movie", () => {
  it("should fetch all movies", async () => {
    const res = await request(index).get("/");
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
  });

  it("should created a film", async () => {
    const movie = {
      id: "8",
      title: "movie z",
      description: "Fiction",
      durée: "50 minutes",
    };
    const res = await request(index).post("/created").send(movie);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Movie added successfully");
  });

  it("should delete a movie by ID", async () => {
    const movieIdToDelete = "4";
    const res = await request(index).delete(`/deleted/${movieIdToDelete}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Movie deleted successfully");
  });

  it("DELETE with ID not fourn should return 404 for non-existing movie", async () => {
    const nonExistingMovieId = "35";
    const res = await request(index).delete(`/deleted/${nonExistingMovieId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Movie not found");
  });

  it("PUT modified with ID should update an existing movie", async () => {
    const movieIdToUpdate = "1";
    const updatedMovieData = {
      id: "Updated Id",
      title: "Updated Movie",
      description: "Updated Genre",
      duration: "150 minutes",
    };

    const res = await request(index)
      .put(`/modified/${movieIdToUpdate}`)
      .send(updatedMovieData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Movie updated successfully");
  });

  it("PUT modified with ID NOT FOUND should return 404 for non-existing movie", async () => {
    const nonExistingMovieId = "35";
    const updatedMovieData = {
      id: "Updated Id",
      title: "Updated Movie",
      description: "Updated Genre",
      duration: "150 minutes",
    };

    const res = await request(index)
      .put(`/modified/${nonExistingMovieId}`)
      .send(updatedMovieData);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Movie not found");
  });

  it("GET /genre should return genres", async () => {
    const res = await request(index).get("/genre");

    expect(res.status).toBe(200);

    /* const expectedGenres = {
      Action: 1,
      Fiction: 1,
    };
  
    expect(res.body.genres).toEqual(expectedGenres); */
  });
});
