import sys


def sum_of_digits(x):
    # Convert the number to string
    x_str = str(x)

    # Initialize a variable to store the sum
    digit_sum = 0

    # Iterate through each digit in the string
    for digit in x_str:
        # Convert the digit back to integer and add it to the sum
        digit_sum += int(digit)

    return digit_sum

# Prompt the user to enter the input number
#x = int(input("Enter a number: "))

# Call the function to find the sum of digits
result = sum_of_digits(686)

print("Sum of digits:", result)

if sys.argv[1] == 'sum_of_digits':
    sum_of_digits(34)
     
    print("Again Sum of digits:", result)

sys.stdout.flush()
