import axios from "axios";
import { useEffect, useState } from "react";

const moviesData = [
  {
    id: 1,
    title: "ADBC",
    description: "ljvnvm",
    rating: 4,
  },
  {
    id: 2,
    title: "Jab We Met",
    description: "ljvnvm",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Hum dil de chuke sanam",
    description: "ljvnvm",
    rating: 4.3,
  },
  {
    id: 4,
    title: "Himmatwala",
    description: "ljvnvm",
    rating: 4.1,
  },
  {
    id: 5,
    title: "Pushpa",
    description: "ljvnvm",
    rating: 3,
  },
  {
    id: 6,
    title: "Jawaan",
    description: "ljvnvm",
    rating: 2,
  },
  {
    id: 7,
    title: "ADBC2",
    description: "ljvnvm",
    rating: 3,
  },
];

const Home = () => {
  const [moviesList, setMoviesList] = useState(moviesData);
  const [inputValue, setInputValue] = useState("");
 // const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsOnPage = 3;
  const startindex = (page - 1) * itemsOnPage;
  const availableitems = moviesList?.slice(
    startindex,
    startindex + itemsOnPage
  );
  const totalPages = Math.ceil(moviesList?.length / itemsOnPage);

  useEffect(() => {
    const fetchMovies = async () => {
     // setloading(true);
      await axios
        .get("http://freetestapi.com/api/v1/movies")
        .then((response) => {
          console.log(response);
         // setloading(false);
        })
        .catch((error) => {
          console.log(error?.message);
        });
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filteredMoviesData = () => {
      const data = moviesData?.filter((movie) =>
        movie?.title?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      setMoviesList(data);
    };

    const debounce = setTimeout(() => {
      filteredMoviesData();
    }, 500);

    return () => clearTimeout(debounce);
  }, [inputValue]);

  // if api is in loading state

  //   if (loading) {
  //     return <div>loading...</div>;
  //   }

  return (
    <div>
      <div className="flex grid-cols-2">
      <div className="text-3xl m-5 font-medium">Watch.movies</div>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full mx-10 border m-3 p-2 rounded-md border-gray-300"
          placeholder="Find the movies"
        />
      </div>
      <div className="flex justify-end gap-2 mx-14 font-bold">
        Total movies:{" "}
        <span className="text-gray-500">{moviesList?.length}</span>
      </div>
      <div>
        {availableitems?.map((movie) => {
          return (
            <div key={movie?.id} className="shadow-md mb-5 bg-gray-100 rounded p-3 m-3 mx-10">
              <div className="text-lg">{movie?.title}</div>
              <div>
                <p className="font-bold mt-4">About</p>
                <p className="text-gray-500 font-medium text-sm">
                  {movie?.description}
                </p>
              </div>
              <div>{movie?.rating}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-5 mb-10">
        <button
          className="text-white p-3 bg-blue-500 rounded-sm cursor-pointer"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="text-white p-3 bg-blue-500 rounded-sm cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
