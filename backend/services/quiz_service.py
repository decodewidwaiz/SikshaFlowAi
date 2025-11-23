def generate_quiz(quiz_data):
    quiz_list = []
    for q in quiz_data:
        try:
            correct_index = q["options"].index(q["answer"])
            quiz_list.append({
                "question": q["question"],
                "options": q["options"],
                "correct": correct_index
            })
        except ValueError:
            # If the answer is not in the options, skip this question
            # This can happen if the AI generates a faulty quiz
            print(f"Skipping quiz question with invalid answer: {q}")
            continue
    return quiz_list
