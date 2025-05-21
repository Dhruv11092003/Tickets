function getformatDateOrDaysAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInTime = now - date; // milliseconds
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  
    if (diffInDays <= 7) {
      return diffInDays === 0 ? "Today" : `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  }

export default getformatDateOrDaysAgo;