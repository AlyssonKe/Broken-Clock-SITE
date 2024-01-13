// components/Avatar.js
import React, { useState, useEffect } from 'react';

export default function PlayersOnline({ universeId }) {
  const [playersOnline, setPlayersOnline] = useState('');

  useEffect(() => {
    const fetchPlayersOnline = async () => {
      try {
        const response = await fetch(`/api/players-online/${universeId}`, {
          method: "GAME_INFO"
        });
        const data = await response.text();
        setPlayersOnline(data);
      } catch (error) {
        console.error('Erro ao buscar avatar:', error);
      }
    };

    fetchPlayersOnline();
  }, [universeId]);


  return (
    <div>
      {playersOnline ? (
        <div className='flex items-center'>
          <div className='h-6 w-6 mr-2'>
            <svg className='fill-white duration-200 hover:fill-main-blue hover:duration-200' viewBox="0 2 30,30 ">
              <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/>
            </svg>
          </div>
          <p className='w-64 overflow-hidden whitespace-nowrap text-ellipsis sm:w-32 md:w-64'>{playersOnline} Players online</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};