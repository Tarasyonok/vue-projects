<template>
    <div class="container-sm">
        <h1 class="text-center mb-4">Правила</h1>
        <p>В викторине 10 вопросов. У каждого вопроса есть 4 варианта ответа.
            Игроку требуется выбрать правильный ответ. В случае правильного ответа игрок получает 10 очков и на экране появляется следующий вопрос.
            Если игрок ответил не верно, то у него отнимается 20 штрафных очков и игра заканчивается.
            Также игра заквнчивается если игрок ответил на все 10 вопросов без ошибок. В этом случае игрок получает 20 бонусных очков.
            Очки зачисляются в рейтинг только после очончания игры. Если переключится в рейтинг, профиль, правила или перезагрузить страницу, то очки не зачислятся.
            Вопросы, на которые вы уже ответили не появятся, пока вы не ответите на все вопросы которые есть в базе.
            После этого вопросы будут выдаваться случайным образом.
        </p>
    </div>
</template>

<style scoped>
div {
    padding: 0 70px;
    font-family: 'Cutive Mono', monospace;
}

p {
    font-size: 20px;
}
</style>