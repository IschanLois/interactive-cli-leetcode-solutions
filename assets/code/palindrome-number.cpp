class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0) return false;
        
        long reverse = 0;
        int cur = x;

        while(cur > 0){
            reverse = 10*reverse + (cur % 10);
            cur /= 10;
        }
        
        return reverse == x;
    }
};
