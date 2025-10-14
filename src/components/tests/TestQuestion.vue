<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  selectedAnswer: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['answer-selected'])

const selectAnswer = (answerId) => {
  emit('answer-selected', answerId)
}
</script>

<template>
  <div class="test-question">
    <div class="question-header">
      <span class="question-number">Pytanie {{ questionNumber }} / {{ totalQuestions }}</span>
    </div>

    <div v-if="question.image" class="question-image">
      <img :src="question.image" :alt="'Grafika do pytania ' + questionNumber" />
    </div>

    <h2 class="question-text">{{ question.question }}</h2>

    <div class="answers-list">
      <button
        v-for="answer in question.answers"
        :key="answer.id"
        @click="selectAnswer(answer.id)"
        class="answer-btn"
        :class="{ selected: selectedAnswer === answer.id }"
      >
        <div class="answer-letter">{{ answer.id.toUpperCase() }}</div>
        <div class="answer-text">{{ answer.text }}</div>
        <div class="answer-check" v-if="selectedAnswer === answer.id">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.test-question {
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
}

.question-header {
  margin-bottom: 24px;
}

.question-number {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #667eea;
}

.question-image {
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
}

.question-image img {
  width: 100%;
  height: auto;
  display: block;
}

.question-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text, #333);
  line-height: 1.5;
  margin-bottom: 30px;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.answer-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
}

.answer-btn:hover {
  border-color: #667eea;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.answer-btn.selected {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-color: #667eea;
  border-width: 3px;
}

.answer-letter {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.answer-btn.selected .answer-letter {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.answer-text {
  flex: 1;
  font-size: 1.05rem;
  color: var(--color-text, #333);
  line-height: 1.5;
}

.answer-check {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #22c55e;
  border-radius: 50%;
  flex-shrink: 0;
}

.answer-check svg {
  width: 18px;
  height: 18px;
  stroke: white;
}

@media (max-width: 768px) {
  .test-question {
    padding: 24px 20px;
  }

  .question-text {
    font-size: 1.2rem;
  }

  .answer-btn {
    padding: 16px 18px;
  }

  .answer-letter {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .answer-text {
    font-size: 0.95rem;
  }

  .answer-btn:hover {
    transform: translateX(0);
  }
}
</style>