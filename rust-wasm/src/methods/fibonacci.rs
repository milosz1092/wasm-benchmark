use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci_recu(n: usize) -> u32 {
    match n {
        1 | 2 => 1,
        3 => 2,
        _ => fibonacci_recu(n - 1) + fibonacci_recu(n - 2),
    }
}
