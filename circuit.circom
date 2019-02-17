//https://en.wikipedia.org/wiki/Zero-knowledge_proof#Short_summary
//https://github.com/iden3/circom
include "sha256/sha256_2.circom";
include "escalarmulfix.circom";

template Peggy() {
        signal private input x;
        signal private input r;
        signal output C;
        signal output y;
        y <== g pow x mod p;
        C <== g pow r mod p;
        (x+r)mod(p-1) ===  x mod (p-1)
}

component main = Peggy();
