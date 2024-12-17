import { useQuery } from "@tanstack/react-query";
import { SimpleTestGetApi } from "@/services/apiServices/simpleTestGetApi";

interface MockGetResponse {
  title: string;
  body: string;
}

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery<MockGetResponse, Error>({
    queryKey: ["Unique key id"],
    queryFn: async (): Promise<MockGetResponse> => {
      const response = await SimpleTestGetApi.MockGetQuery();
      return response?.data;
    },
    staleTime: 5 * 1000 //cache fresh for 5 seconds
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Home</h1>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
    </div>
  );
};

export default Home;
