use wasm_bindgen::prelude::*;
use std::hash::Hasher;
use twox_hash::XxHash64;

#[wasm_bindgen]
pub fn xxhash_own_iter(data: &str, iterations: Option<u32>) -> String {
    let mut hasher: XxHash64;
    let mut output: String = data.to_string();
    
    for _i in 0..iterations.unwrap() {
        hasher = XxHash64::with_seed(0);
        hasher.write(output.as_bytes());

        output = format!("{:x}", hasher.finish());
    }

    output
}

#[wasm_bindgen]
pub fn xxhash_once(data: &str) -> String {
    let mut hasher = XxHash64::with_seed(0);
    hasher.write(data.as_bytes());
    format!("{:x}", hasher.finish())
}
