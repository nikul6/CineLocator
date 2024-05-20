type RootStackParamList = {
    Login: undefined;
    TheatreMap: undefined;
    TheatreDetails: { theatres: Theatre }
    MoviesScreen: undefined;
};

type LoginData = {
    username: string
    password: string
}

type Timings = {
    time: string;
    price: number;
}

type ShowTimes = {
    movie: string;
    timings: Timings[];
}

type Theatre = {
    id: number;
    latitude: number;
    longitude: number;
    theatreName: string;
    theatreAddress: string;
    numberOfStars: number;
    rating: number;
    image: string;
    showtimes: ShowTimes[];
}

type Movie = {
    id: number;
    movie: string;
    rating: number;
    image: string;
    imdb_url: string;
  };