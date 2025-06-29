const formatDateTime = (date) => {
  // Kiểm tra xem đầu vào có hợp lệ không
  if (!date || isNaN(new Date(date).getTime())) {
    return "N/A";
  }

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default formatDateTime;