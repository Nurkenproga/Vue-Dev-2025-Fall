<template>
  <div class="video-card" :class="{ 'dark-theme': isDarkTheme }">
    <div class="thumbnail-container">
      <img :src="thumbnail" :alt="title" class="thumbnail" />
      <div class="views-overlay">{{ views }} просмотров</div>
    </div>
    
    <div class="video-info">
      <h3 class="video-title">{{ title }}</h3>
      <p class="channel-name">{{ channel }}</p>
      
      <div class="video-actions">
        <button 
          @click="handleLikeClick" 
          class="like-button"
          :class="{ 'liked': isLiked }"
        >
          Лайк {{ likes }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  isDarkTheme: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['liked'])

const isLiked = ref(false)

const handleLikeClick = () => {
  isLiked.value = !isLiked.value
  emit('liked', props.title)
}
</script>

<style scoped>
.video-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.video-card.dark-theme {
  background: #2d2d2d;
  color: white;
}

.thumbnail-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.views-overlay {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.video-info {
  padding: 16px;
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
  color: #333;
}

.dark-theme .video-title {
  color: white;
}

.channel-name {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.dark-theme .channel-name {
  color: #ccc;
}

.video-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.like-button {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.like-button:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

.like-button.liked {
  background: #ff6b6b;
  border-color: #ff5252;
  color: white;
}

.dark-theme .like-button {
  background: #404040;
  border-color: #555;
  color: white;
}

.dark-theme .like-button:hover {
  background: #555;
}

.dark-theme .like-button.liked {
  background: #ff6b6b;
  border-color: #ff5252;
}
</style>
