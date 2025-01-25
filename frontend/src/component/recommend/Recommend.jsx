import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const PetRecommendations = () => {
  const { id } = useParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id) return;

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/suggestedpets/${id}`
        );

        console.log('Response data:', response.data);

        if (response.data.success && response.data.data.length > 0) {
          const processedPets = response.data.data.map((item) => {
            const petData = item.pet || item;
            return {
              ...petData,
            };
          });

          setPets(processedPets);
        } else {
          setError('No recommended pets found.');
        }
      } catch (error) {
        console.error('Recommendation fetch error:', error);
        setError('Failed to fetch pet recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [id]);

  console.log('Current pets state:', pets);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pets.length) {
    return null;
  }

  return (
    <div className="w-full mt-5 px-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};
const PetCard = ({ pet }) => {
  const imageUrl = pet.image
    ? `${import.meta.env.VITE_BACKEND_URL}/${pet.image.replace(/^.*[\\/]/, '')}`
    : '/placeholder.jpg';

  return (
    <NavLink to={`/pet/${pet._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img
            src={imageUrl}
            alt={pet.name || 'Pet'}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {pet?.name || 'Unknown'}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              {pet?.age ? `${pet.age} years old` : 'Age unknown'} ·{' '}
              {pet?.gender || 'Unknown'}
            </div>

            <div className="flex flex-wrap gap-2">
              {pet?.category?.category_name && (
                <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                  {pet.category.category_name}
                </span>
              )}
              {pet?.breed && (
                <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                  {pet.breed}
                </span>
              )}
              {pet?.vaccination_status && (
                <span
                  className={`px-2 py-1 text-sm rounded-full ${pet.vaccination_status === 'vaccinated'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {pet.vaccination_status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default PetRecommendations;