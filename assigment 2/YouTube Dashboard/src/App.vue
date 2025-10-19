<template>
  <div id="app" :class="{ 'dark-theme': isDarkTheme }">
    <header class="header">
      <h1 class="app-title">Mini YouTube Dashboard</h1>
      
      <div class="header-controls">
        <div class="search-container">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Поиск видео или каналов..." 
            class="search-input"
          />
          <div class="search-results">
            Найдено видео: {{ videosFound }}
          </div>
        </div>
        
        <div class="controls">
          <button @click="toggleSortByViews" class="control-button" :class="{ 'active': isSorted }">
            {{ isSorted ? 'Отключить сортировку' : 'Сортировать по просмотрам' }}
          </button>
          <button @click="toggleTheme" class="control-button theme-toggle">
            {{ isDarkTheme ? 'Светлая' : 'Темная' }} тема
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <p>Загрузка видео...</p>
      </div>

      <div v-else-if="filteredVideos.length === 0" class="no-videos">
        <h2>Видео не найдены</h2>
        <p v-if="searchQuery">Попробуйте изменить поисковый запрос</p>
        <p v-else>Нет доступных видео для отображения</p>
      </div>

      <div v-else class="videos-grid">
        <VideoCard
          v-for="video in filteredVideos"
          :key="video.id"
          :title="video.title"
          :channel="video.channel"
          :views="video.views"
          :thumbnail="video.thumbnail"
          :likes="video.likes"
          :is-dark-theme="isDarkTheme"
          @liked="handleLike"
        />
      </div>
    </main>

    <footer class="footer">
      <div class="stats">
        <span class="stat-item">
          Всего видео: {{ videos.length }}
        </span>
        <span class="stat-item">
          Общее количество лайков: {{ totalLikes }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useVideos } from './composables/useVideos.js'
import VideoCard from './components/VideoCard.vue'

// Используем composable
const {
  videos,
  searchQuery,
  totalLikes,
  isLoading,
  isDarkTheme,
  isSorted,
  filteredVideos,
  videosFound,
  handleLike,
  toggleSortByViews,
  toggleTheme
} = useVideos()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
  transition: background-color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app.dark-theme {
  background: #1a1a1a;
  color: white;
}

.header {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
}

.dark-theme .header {
  background: #2d2d2d;
  border-bottom-color: #404040;
}

.app-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.dark-theme .app-title {
  color: white;
}

.header-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.search-container {
  width: 100%;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.dark-theme .search-input {
  background: #404040;
  border-color: #555;
  color: white;
}

.dark-theme .search-input:focus {
  border-color: #ff6b6b;
}

.search-results {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.dark-theme .search-results {
  color: #ccc;
}

.controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.control-button:hover {
  background: #ff5252;
  transform: translateY(-1px);
}

.theme-toggle {
  background: #6c757d;
}

.theme-toggle:hover {
  background: #5a6268;
}

.control-button.active {
  background: #28a745;
}

.control-button.active:hover {
  background: #218838;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-videos {
  text-align: center;
  padding: 60px 20px;
}


.no-videos h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #333;
}

.dark-theme .no-videos h2 {
  color: white;
}

.no-videos p {
  color: #666;
  font-size: 16px;
}

.dark-theme .no-videos p {
  color: #ccc;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.footer {
  background: white;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
}

.dark-theme .footer {
  background: #2d2d2d;
  border-top-color: #404040;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.dark-theme .stat-item {
  color: #ccc;
}

@media (max-width: 768px) {
  .header-controls {
    gap: 15px;
  }
  
  .controls {
    flex-direction: column;
    width: 100%;
  }
  
  .control-button {
    width: 100%;
    justify-content: center;
  }
  
  .videos-grid {
    grid-template-columns: 1fr;
  }
  
  .stats {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
