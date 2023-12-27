// components/Avatar.js
import React, { useState, useEffect } from 'react';

export default function Avatar({ userId }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`/api/avatar/${userId}`);
        const data = await response.text();
        setImageUrl(data);
      } catch (error) {
        console.error('Erro ao buscar avatar:', error);
      }
    };

    fetchAvatar();
  }, [userId]);

  return (
      <img
        src={imageUrl}
        className="object-cover object-center w-full h-full"
        alt={`Character`}
        onError={(e) => {e.target.style.display = 'none'; console.log("Error")}}
        onLoad={(e) => {e.target.style.display = 'block'; console.log("Careregou")}}
        />
  );
};