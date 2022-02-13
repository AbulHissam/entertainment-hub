export const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";
  const genresForURL = selectedGenres.map((g) => g.id);
  return genresForURL.reduce((acc, cv) => acc + "," + cv);
};
