class Solution {
public:
    int reverse(int x) {
        int res = 0;
        int rem = 0;
        while(x != 0){
            rem = x % 10;
            if(res > INT_MAX/10 || res < INT_MIN/10) return 0;

            res *= 10;
            res += rem;
            x /= 10;
        }


        return res;
    }
};
