module.exports = class Matrix{
    static matrix_prod(m1,m2,s1,s2){
        // Cij = sum(Aik*Bkj);
        for(let i=0; i<m1.length; i++){
            
        }
    }

    static matrix_add(m1,m2){
        let sum = [];
        for(let i=0; i<m1.length; i++){
            sum[i] = m1[i]+m2[i];
        }
        return sum;
    }

    //other
}
